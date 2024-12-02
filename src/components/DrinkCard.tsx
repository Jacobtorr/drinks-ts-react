import type { Drink } from "../types"
import { useAppStore } from "../stores/useAppStore"

type DrinkCardProps = {
    drink: Drink
}

export default function DrinkCard({drink} : DrinkCardProps) {

    const selectRecipe = useAppStore(state => state.selectRecipe)
     useAppStore(state => state.selectedRecipe)


  return (
    <div className="border shadow-lg">
        <div className="overflow-hidden">
            <img 
                src={drink.strDrinkThumb} 
                alt={`Imagen de ${drink.strDrink}`} 
                className="hover:scale-125 transition-transform" 
            />
        </div>

        <div className="p-5">
            <h2 className="text-2xl truncate font-black">{drink.strDrink}</h2>
            <button
                type="button"
                className="bg-orange-500 hover:bg-orange-600 mt-5 w-full p-3 font-bold text-white text-lg rounded-lg transition-all uppercase"
                onClick={() => selectRecipe(drink.idDrink)}
            >
                Ver Receta
            </button>

        </div>

    </div>
  )
}
