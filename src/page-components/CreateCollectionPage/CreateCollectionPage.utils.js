import axios from "axios";

const arrayOfNavigations = [
  {
    routeEnd: "my-collections",
    href: "/my-collections",
    text: "My Collections",
  },
  {
    routeEnd: "create-collection",
    href: "/my-collections/create-collection",
    text: "Create a Collection",
  },
];

export const getNavigationData = (path) => {
  const paths = path.split("/");

  return arrayOfNavigations.map(({ routeEnd, href, text }) => {
    if (paths.includes(routeEnd)) {
      return { text, href };
    }
  });
};

export const sendImagesToServer = async (logo, featured, banner) => {
  const accessToken = localStorage.getItem("accessToken");
  const logoForm = new FormData();
  logoForm.append("file", logo);

  const logoImage = ({ data } = await axios.post(
    `${process.env.BACKEND_URL}/collections/uploag/image`,
    logoForm,
    {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    }
  ));

  let featuredImage, bannerImage;

  if (featured) {
    const featuredForm = new FormData();
    featuredForm.append("file", featured);

    featuredImage = { data } = await axios.post(
      `${process.env.BACKEND_URL}/collections/uploag/image`,
      featuredForm,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }

  if (banner) {
    const bannerForm = new FormData();
    bannerForm.append("file", banner);

    bannerImage = { data } = await axios.post(
      `${process.env.BACKEND_URL}/collections/uploag/image`,
      bannerForm,
      {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );
  }

  return {
    bannerImage,
    featuredImage,
    logoImage,
  };
};
