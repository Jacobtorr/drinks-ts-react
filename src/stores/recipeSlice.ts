import { StateCreator } from "zustand"
import { getCategories, getRecipeById } from "../services/RecipeService"
import { getRecipes } from "../services/RecipeService"
import type { Categories, Drink, Drinks, Recipe, SearchFilter } from "../types"

// State & Type
export type RecipesSliceType = {
    categories: Categories
    drinks: Drinks
    selectedRecipe: Recipe
    modal: boolean,
    fetchCategories: () => Promise<void>
    searchRecipes: (searchFilters: SearchFilter) => Promise<void>
    selectRecipe: (id: Drink['idDrink']) => Promise<void>
    closeModal: () => void
}

// Actions
export const createRecipesSlice : StateCreator<RecipesSliceType> = (set) => ({
    categories: {
        drinks: []
    },
    drinks: {
        drinks: []
    },
    selectedRecipe: {} as Recipe,
    modal: false,
    fetchCategories: async () => {
        const categories = await getCategories()

        // Setear en el State
        set({
            categories
        })
    },
    searchRecipes: async (filters) => {
        const drinks = await getRecipes(filters)

        // Setear en el State
        set({
            drinks
        })
    },
    selectRecipe: async (id) => {
       const selectedRecipe = await getRecipeById(id)

       // Setear en el State
       set({
        selectedRecipe,
        modal: true
       })
    },
    closeModal: () => {
        
        // Setear en el state
        set({
            modal: false,
            selectedRecipe: {} as Recipe
        })
    }
})