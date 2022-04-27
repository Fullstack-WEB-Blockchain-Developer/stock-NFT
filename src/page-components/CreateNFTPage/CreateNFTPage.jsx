import { useState, useEffect, useRef } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
//axios
import axios from "axios";
//redux
import { useDispatch } from "react-redux";
import { open as openError } from "../../redux/slices/errorSnackbarSlice";
import { open as openSuccess } from "../../redux/slices/successSnackbarSlice";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//components
import { CustSwitch } from "../../components/CustSwitch/CustSwitch";
import { CustButton } from "../../components/CustButton/CustButton";
import { AddStatsOrLevelsModal } from "../../modals/AddToNFTModal/AddStatsOrLevelsModal";
import { ConnectWalletModal } from "../../modals/ConnectWalletModal/ConnectWalletModal";
import { Stat } from "../../components/Stat/Stat";
import { Level } from "../../components/Level/Level";
import { Property } from "../../components/Property/Property";
import { AddPropertiesModal } from "../../modals/AddToNFTModal/AddPropertiesModal";
//utils
import { textFields, selects, uploadAndSwitchFields } from "./CreateNFTPage.utils";
//web3
import { useWeb3React } from "@web3-react/core";
//hooks
import { useStyles } from "../../hooks/useStyles";
import useAuth from "../../hooks/useAuth";
//styles
import styles from "./CreateNFTPage.module.css";

var contractAddress;
export const CreateNFTPage = () => {
  const { active, library, chainId } = useWeb3React();
  const dispatch = useDispatch();
  const { account, error, isAuthorized } = useAuth();
  const inputRef = useRef();
  const videoRef = useRef();

  // if (error) {
  //   dispatch(openError(`${error.statusCode + " " + error.message}`));
  // }

  const [values, setValues] = useState({
    file: undefined,
    name: "",
    externalLink: "",
    description: "",
    properties: [],
    levels: [],
    stats: [],
    collection: "none",
    unlockableContent: "",
    isSensitiveContent: false,
    supply: "none",
    blockchainType: "none",
    freezeMetadata: "none",
    isAssetBacked: false,
  });

  const [previewFile, setPreviewFile] = useState();
  const [ratio, setRatio] = useState(16 / 9);
  const [videoSizes, setVideoSizes] = useState({});
  const [disabledButton, setDisabledButton] = useState(true);
  const [enabledUnlockable, setEnsabledUnlockable] = useState(true);
  //modals open
  const [isAddStatsOpened, setIsAddStatsOpened] = useState(false);
  const [isAddLevelsOpened, setIsAddLevelsOpened] = useState(false);
  const [isAddPropertiesOpened, setIsAddPropertiesOpened] = useState(false);
  const [isConnectWalletOpened, setIsConnectWalletOpened] = useState(false);
  //fetched data with useEffect
  const [collections, setCollections] = useState([]);
  const [blockchainTypes, setBlockchainTypes] = useState([]);

  const muiClasses = useStyles();

  //handle functions

  const handleChange = (e, value, type) => {
    switch (type) {
      case "string":
        setValues({ ...values, [value]: e.target.value });
        break;
      case "file":
        if (!e.target.files || e.target.files.length === 0) {
          setValues({ ...values, file: undefined });
          return;
        }

        const file = e.target.files[0];

        if (file.size < 100000000) {
          setValues({ ...values, file: file });
        } else {
          dispatch(openError(`The uploaded file must be smaller than 100 mb`));
        }
        break;
      case "boolean":
        if (value === "unlockableContent") {
          setEnsabledUnlockable(e.target.checked);
        } else if (value === "isSensitiveContent") {
          setValues({ ...values, [value]: e.target.checked });
        }
        break;
    }
  };

  const handleOpenPopup = (type) => {
    switch (type) {
      case "stats":
        setIsAddStatsOpened(true);
        break;
      case "levels":
        setIsAddLevelsOpened(true);
        break;
      case "properties":
        setIsAddPropertiesOpened(true);
        break;
    }
  };

  const sendDataToServer = async () => {
    const imageHash = await pinFileToIPFS(values.file); //use `https://ipfs.io/ipfs/${imageHash}` as image
    //code here.
    const blockchainTypeId = blockchainTypes.find((type) => type.name === values.blockchainType)?.id || 0;
    const collectionId = collections.find((elem) => elem.name === values.blockchainType)?.id || 0;

    try {
      const accessToken = localStorage.getItem("accessToken");
      const form = new FormData();
      form.append("content", values.file);

      const response = await axios.post(`${process.env.BACKEND_URL}/nfts/upload/media`, form, {
        headers: {
          Authorization: "Bearer " + accessToken,
          "Content-type": "multipart/form-data; boundary=MyBoundary",
        },
      });
      const body = {
        name: values.name,
        fileName: response.data,
        externalLink: values.externalLink,
        description: values.description,
        unlockableContent: values.unlockableContent,
        isSensitiveContent: values.isSensitiveContent,
        isAssetBacked: values.isAssetBacked,
        blockchainTypeId,
        collectionId,
      };

      if (values.stats.length > 0) body.stats = values.stats;
      if (values.properties.length > 0) body.properties = values.properties;
      if (values.levels.length > 0) body.levels = values.levels;

      const res = await axios.post(`${process.env.BACKEND_URL}/nfts`, body, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      dispatch(openSuccess(`Thank you! Your NFT will be under review`));
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const handleSave = async () => {
    if (isAuthorized) {
      sendDataToServer();
    } else {
      setIsConnectWalletOpened(true);
    }
  };

  const handleLoadImage = (width, height) => {
    setRatio(width / height);
  };

  const handleUploadButton = () => {
    inputRef.current.click();
  };

  const handleDeleteButton = () => {
    inputRef.current.value = null;
    setPreviewFile(undefined);
    setValues({ ...values, file: undefined });
  };

  const pinFileToIPFS = async (file) => {
    let data = new FormData();
    data.append("file", file);

    const responsive = await axios.post(`https://api.pinata.cloud/pinning/pinFileToIPFS`, data, {
      maxBodyLength: "Infinity", //this is needed to prevent axios from erroring out with large files
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    });
    return responsive.data.IpfsHash;
  };

  const pinJSONToIPFS = async (JSONBody) => {
    const responsive = await axios.post(`https://api.pinata.cloud/pinning/pinJSONToIPFS`, JSONBody, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_SECRET_API_KEY,
      },
    });
    return responsive.data.IpfsHash;
  };

  //fetch functions

  const fetchCollections = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const { data } = await axios.get(`${process.env.BACKEND_URL}/collections`, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      setCollections([...data]);
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  const fetchBlockchainTypes = async () => {
    try {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/nfts/blockchainTypes/all`);
      const array = [];
      data.forEach(({ name, id }) => {
        array.push({ name, id });
      });
      setBlockchainTypes(array);
    } catch (e) {
      dispatch(
        openError(e.response?.data ? `${e.response.data.statusCode} ${e.response.data.message}` : e.message)
      );
    }
  };

  // useEffects

  useEffect(() => {
    isAuthorized && !error && fetchCollections();
    !error && fetchBlockchainTypes();
  }, []);

  useEffect(() => {
    isAuthorized && setIsConnectWalletOpened(false);
  }, [isAuthorized]);

  useEffect(() => {
    if (values.file && values.name && values.blockchainType !== "none" && values.description) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
  }, [values.file, values.name, values.description, values.blockchainType]);

  useEffect(() => {
    if (!values.file) {
      setPreviewFile(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(values.file);
    setPreviewFile(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [values.file]);

  useEffect(() => {
    if (previewFile && values.file?.type.startsWith("video") && videoRef.current?.src) {
      const width = videoRef.current.clientWidth;
      const height = videoRef.current.clientHeight;
      const ratio = width / height;
      setVideoSizes({
        width: "360px",
        height: `${360 / ratio}px`,
      });
    }
  }, [values.file, previewFile]);

  const star = <span className={styles.star}>*</span>;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.mainTitle}>
          <span>Create New Item</span>
        </div>
        <div className={styles.uploadItemSection}>
          <div className={styles.title}>
            <span>Image, Video, Audio, or 3D Model {star}</span>
          </div>
          <div className={styles.description}>
            <span>
              File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB
            </span>
          </div>
          <div className={styles.uploadFileWrapper}>
            <div
              className={styles.dragPlaceholder}
              style={{
                height: previewFile ? "auto" : "200px",
              }}
            >
              <div
                className={styles.imageWrapper}
                style={{
                  background: previewFile ? "none" : 'url("/create-nft/Icon-Image.png") no-repeat center',
                  height:
                    (!previewFile && "100%") ||
                    (previewFile &&
                      values.file?.type.startsWith("video") &&
                      videoRef.current &&
                      videoSizes.height) ||
                    (previewFile && values.file?.type.startsWith("audio") && "200px"),
                }}
              >
                {previewFile && values.file?.type.startsWith("image") && (
                  <Image
                    src={previewFile}
                    alt="image"
                    width={400}
                    height={400 / ratio}
                    layout="responsive"
                    objectFit="contain"
                    onLoadingComplete={({ naturalWidth, naturalHeight }) =>
                      handleLoadImage(naturalWidth, naturalHeight)
                    }
                  />
                )}
              </div>
              <input
                className={styles.uploadFileInput}
                type="file"
                ref={inputRef}
                onChange={(e) => handleChange(e, "file", "file")}
                accept=".png, .jpg, .gif, .svg, .mp4, .webm, .mp3, .wav, .ogg, .glb, .gltf"
              />
              {previewFile && values.file?.type.startsWith("video") && (
                <video
                  src={previewFile}
                  ref={videoRef}
                  controls="controls"
                  autoPlay="true"
                  className={styles.video}
                />
              )}
              {previewFile && values.file?.type.startsWith("audio") && (
                <audio src={previewFile} controls="controls" autoPlay="true" className={styles.audio} />
              )}
            </div>
            <div className={styles.uploadButtonsWrapper}>
              <CustButton
                color="primary"
                text={previewFile ? "Change File" : "Upload File"}
                onClick={handleUploadButton}
                className={styles.uploadButton}
                fullWidth
              />
              <CustButton color="red" text="Delete File" onClick={handleDeleteButton} fullWidth />
            </div>
          </div>
        </div>
        {textFields.map(({ title, description, required, label, multiline, id, maxLength }) => (
          <div key={id} className={styles.section}>
            <div
              className={cn(styles.title, {
                [styles.name]: title === "Name",
              })}
            >
              <span>
                {title} {required && star}
              </span>
            </div>
            {description && (
              <div className={styles.description}>
                <span>{description}</span>
              </div>
            )}
            <TextField
              fullWidth
              id={label}
              label={label}
              variant="outlined"
              className={muiClasses.textField}
              value={values[id]}
              onChange={(e) => handleChange(e, id, "string")}
              InputLabelProps={{
                style: { color: "var(--shadow)" },
              }}
              InputProps={{ style: { color: "white" } }}
              multiline={multiline}
              inputProps={{
                maxLength: maxLength || 524288,
              }}
              minRows={multiline && 3}
              maxRows={multiline && 10}
            />
          </div>
        ))}
        <div className={styles.section}>
          <div className={styles.title}>
            <span>{selects[0].title}</span>
          </div>
          <div className={styles.description}>
            <span>{selects[0].description}</span>
          </div>
          <Select
            fullWidth
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            style={{
              color: "white",
            }}
            onChange={(e) => handleChange(e, "collection", "string")}
            value={values.collection}
            className={muiClasses.select}
          >
            <MenuItem disabled value="none">
              <span style={{ color: "rgb(77, 77, 77)" }}>{selects[0].placeholder}</span>
            </MenuItem>
            {collections.map(({ id, name }) => (
              <MenuItem key={id} value={name}>
                <span>{name}</span>
              </MenuItem>
            ))}
          </Select>
        </div>
        {uploadAndSwitchFields.map(({ title, description, icon, type, id }) => (
          <div key={id} className={styles.underlinedSection}>
            <div>
              <div className={styles.fieldIcon}>
                <Image src={icon} layout="fill" alt={title} />
              </div>
              <div className={styles.fieldsTitleDescriptionWrapper}>
                <div className={styles.boldTitle}>
                  <span>{title}</span>
                </div>
                <div className={styles.description}>
                  <span>{description}</span>
                </div>
              </div>
              {type === "add" ? (
                <div className={styles.plus} onClick={() => handleOpenPopup(id)}>
                  <span>+</span>
                </div>
              ) : (
                <CustSwitch
                  className={styles.switch}
                  checked={title === "Unlockable Content" ? enabledUnlockable : values[id]}
                  onChange={(e) => handleChange(e, id, "boolean")}
                />
              )}
            </div>
            {title === "Unlockable Content" && (
              <div
                className={cn(styles.unlockable, {
                  [styles.unlockableDisplayed]: enabledUnlockable,
                  [styles.unlockableAbsent]: !enabledUnlockable,
                })}
              >
                <div
                  className={cn(styles.title, {
                    [styles.name]: title === "Name",
                  })}
                ></div>
                <TextField
                  fullWidth
                  id="Unlockable"
                  label="Provide a detail description of your item"
                  variant="outlined"
                  className={muiClasses.textField}
                  value={values.unlockable}
                  onChange={(e) => handleChange(e, "unlockable", "string")}
                  InputLabelProps={{
                    style: { color: "var(--shadow)" },
                  }}
                  InputProps={{ style: { color: "white" } }}
                  multiline
                  minRows={3}
                  maxRows={10}
                />
              </div>
            )}
            {id === "stats" &&
              values.stats.map(({ name, nftValue, maxValue, id }) => (
                <Stat key={id} name={name} nftValue={nftValue} maxValue={maxValue} />
              ))}
            {id === "levels" &&
              values.levels.map(({ name, nftValue, maxValue, id }) => (
                <Level key={id} name={name} nftValue={nftValue} maxValue={maxValue} />
              ))}
            {id === "properties" && (
              <div className={styles.propertiesWrapper}>
                {values.properties.map(({ name, type, id }) => (
                  <Property key={id} name={name} type={type} />
                ))}
              </div>
            )}
          </div>
        ))}
        {selects.slice(1).map(({ title, description, options, placeholder, required, id }) => (
          <div
            className={cn(styles.section, {
              [styles.sectionWithMarginTop]: title === "Blockchain", //"Supply",
              [styles.sectionWithBigMarginBottom]: title === "Blockchain", //"Freeze Metadata",
            })}
            key={id}
          >
            <div className={styles.title}>
              <span>
                {title} {required && star}
              </span>
            </div>
            <div className={styles.description}>
              <span>{description}</span>
            </div>
            <Select
              fullWidth
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              style={{
                color: "white",
              }}
              onChange={(e) => handleChange(e, id, "string")}
              value={values[id]}
              className={muiClasses.select}
            >
              <MenuItem disabled value="none">
                <span style={{ color: "rgb(77, 77, 77)" }}>{placeholder}</span>
              </MenuItem>
              {blockchainTypes.map(({ id, name }) => (
                <MenuItem key={id} value={name}>
                  <span>{name}</span>
                </MenuItem>
              ))}
            </Select>
          </div>
        ))}
        <CustButton
          color="primary"
          text="Save"
          onClick={handleSave}
          className={styles.button}
          disabled={disabledButton}
        />
        <AddStatsOrLevelsModal
          title="Add Stats"
          description="Stats show up underneath your item, are clickable, and can be filtered in your collection’s sidebar."
          isModalOpened={isAddStatsOpened}
          setIsModalOpened={setIsAddStatsOpened}
          data={values}
          setData={setValues}
        />
        <AddStatsOrLevelsModal
          title="Add Levels"
          description="Levels show up underneath your item, are clickable, and can be filtered in your collection's sidebar."
          isModalOpened={isAddLevelsOpened}
          setIsModalOpened={setIsAddLevelsOpened}
          data={values}
          setData={setValues}
        />
        <AddPropertiesModal
          isModalOpened={isAddPropertiesOpened}
          setIsModalOpened={setIsAddPropertiesOpened}
          data={values}
          setData={setValues}
        />
      </div>
      <ConnectWalletModal
        isOpened={isConnectWalletOpened}
        onClose={() => setIsConnectWalletOpened(false)}
      />
    </div>
  );
};
