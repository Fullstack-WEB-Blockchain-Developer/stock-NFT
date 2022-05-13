//next
import Image from 'next/image';
//mui
import { Select, MenuItem } from '@mui/material';
//hooks
import { useStyles } from '../../../../hooks/useStyles';
//utils
import { durationOptions } from '../../TrendingCollections.utils';

export const Selects = ({ filter, setFilter, blockchains, categories }) => {
  const muiClasses = useStyles();

  return (
    <>
      <Select
        fullWidth
        id=""
        type="text"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ width: '320px', marginRight: '24px', maxHeight: '56px', color: 'white' }}
        className={muiClasses.select}
        value={filter.duration}
        InputProps={{ style: { color: 'white' } }}
        onChange={({ target: { value } }) => setFilter({ ...filter, duration: value })}
      >
        {durationOptions.map(({ text }) => (
          <MenuItem value={text} key={text}>
            <span>{text}</span>
          </MenuItem>
        ))}
      </Select>
      <Select
        fullWidth
        id=""
        type="text"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ width: '320px', marginRight: '24px', maxHeight: '56px', color: 'white' }}
        className={muiClasses.select}
        value={filter.category}
        InputProps={{ style: { color: 'white' } }}
        onChange={({ target: { value } }) => setFilter({ ...filter, category: value })}
      >
        {categories.map(({ name, id }) => (
          <MenuItem value={name} key={id}>
            <span>{name}</span>
          </MenuItem>
        ))}
        <MenuItem value="All Categories">
          <span>All Categories</span>
        </MenuItem>
      </Select>
      <Select
        fullWidth
        id=""
        type="text"
        variant="outlined"
        IconComponent={() => (
          <div style={{ right: '16px', position: 'absolute', pointerEvents: 'none' }}>
            <Image src="/view-token/Icon-ArrowDown.svg" height={8} width={16} alt="arrow-up" />
          </div>
        )}
        sx={{ width: '320px', maxHeight: '56px', color: 'white' }}
        className={muiClasses.select}
        value={filter.chain}
        InputProps={{ style: { color: 'white' } }}
        onChange={({ target: { value } }) => setFilter({ ...filter, chain: value })}
      >
        {blockchains.map(({ name, icon, id }) => (
          <MenuItem key={id} value={name}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
              <Image
                alt={`${name}-icon`}
                height={28}
                loader={({ src }) => `${process.env.BACKEND_ASSETS_URL}/icons/${src}`}
                src={icon}
                width={28}
              />
              <span style={{ marginLeft: '8px' }}>{name}</span>
            </span>
          </MenuItem>
        ))}
      </Select>
    </>
  );
};
