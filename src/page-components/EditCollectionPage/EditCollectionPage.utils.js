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
  {
    routeEnd: "[collectionId]",
    href: "#",
    text: "Edit Collection",
  },
];

export const getNavigationData = (path) => {
  const paths = path.split("/");

  const result = arrayOfNavigations.map(({ routeEnd, href, text }) => {
    if (paths.includes(routeEnd)) {
      return { text, href };
    }
  });

  return result.filter((elem) => elem);
};
