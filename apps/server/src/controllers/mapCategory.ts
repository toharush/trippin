import { clientCategories } from '../enums/clientCategory';
import { CATEGORIES_ARRAY } from '../constants/categoryArrays';

export const convertDBCategoryToClientCategory = (
    dbCategory: string
): string => {
    if (dbCategory) {
        if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Resturants;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Museums;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Shows;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Sport;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Night;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Shopping;
        } else if (isCategoryItemExist(dbCategory)) {
            return clientCategories.Nature;
        }
        return clientCategories.Atractions;
    }
    return clientCategories.Atractions;
};

const isCategoryItemExist = (dbCategory: string): Boolean => {
    let flag = false;

    CATEGORIES_ARRAY.forEach(currentCategoryArray => {
        currentCategoryArray.forEach(currentCategoryItem => {
            if (dbCategory.toLowerCase().includes(currentCategoryItem)) {
                flag = true;
            }
        });
    });

    return flag;
};
