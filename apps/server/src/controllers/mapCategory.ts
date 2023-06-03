import { clientCategories } from "../enums/clientCategory";

export const dbCategoryToClientCategoryMapping = (
    dbCategory: string
) => {
    if (dbCategory) {
        if (dbCategory.toLowerCase().includes("dining" || "restaurant" || "food" || "bistro" || "coffee" || "tea")) {
            return clientCategories.Resturants;
        } else if (dbCategory.toLowerCase().includes("museum")) {
            return clientCategories.Museums;
        } else if (dbCategory.toLowerCase().includes("entertainment" || "live" || "show" || "music" || "concert" || "theatre" || "culture")) {
            return clientCategories.Shows;
        } else if (dbCategory.toLowerCase().includes("sport")) {
            return clientCategories.Sport;
        } else if (dbCategory.toLowerCase().includes("night" || "bar" || "pub" || "club" || "dance" || "beer" || "gambling" || "casino" || "cocktail")) {
            return clientCategories.Night;
        } else if (dbCategory.toLowerCase().includes("shopping" || "store" || "mall" || "clothing" || "accessories")) {
            return clientCategories.Shopping;
        } else if (dbCategory.toLowerCase().includes("nature" || "garden" || "wood" || "forest" || "trip" || "lake" || "park" || "camp")) {
            return clientCategories.Nature;
        }
        return clientCategories.Atractions;
    }
    return clientCategories.Atractions;
}
