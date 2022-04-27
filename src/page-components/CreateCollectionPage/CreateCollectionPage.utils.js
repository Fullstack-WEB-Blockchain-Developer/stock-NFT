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
