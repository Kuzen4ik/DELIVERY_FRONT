export const getShopsAPI = async () => {
  return [
    { id: 1, title: "Mk" },
    { id: 2, title: "KFC" },
  ];
};

export const getShopMenuAPI = async (shopId) => {
  return [
    {
      id: 101,
      title: "test1",
      description:
        "description description description description description",
      price: 100,
    },

    {
      id: 102,
      title: "test2",
      description:
        "description description description description description",
      price: 100,
    },

    {
      id: 103,
      title: "test3",
      description:
        "description description description description description",
      price: 100,
    },
    {
      id: 104,
      title: "test4",
      description:
        "description description description description description",
      price: 100,
    },

    {
      id: 105,
      title: "test5",
      description:
        "description description description description description",
      price: 100,
    },

    {
      id: 106,
      title: "test6",
      description:
        "description description description description description",
      price: 100,
    },
  ];
};
