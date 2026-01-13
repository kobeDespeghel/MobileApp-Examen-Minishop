export const queryKeys = {
  products: {
    all: ["products"] as const,
    list: (searchQuery?: string) =>
      [...queryKeys.products.all, "list", searchQuery] as const,
    detail: (id: number) => [...queryKeys.products.all, "detail", id] as const,
  },
};
