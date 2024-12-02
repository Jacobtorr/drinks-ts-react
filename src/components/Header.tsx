import { useMemo, useEffect, useState, ChangeEvent, FormEvent } from "react";
import { NavLink, useLocation } from "react-router-dom"
import { useAppStore } from "../stores/useAppStore";

export default function Header() {

    const { pathname } = useLocation();
    const isHome = useMemo(() => pathname === '/' , [pathname])

    // Lo que viene del Store
    const fetchCategories = useAppStore(state => state.fetchCategories)
    const categories = useAppStore(state => state.categories)
    const searchRecipes = useAppStore(state => state.searchRecipes)
    const showNotification = useAppStore(state => state.showNotification)

    const [ searchFilters, setSearchFilters ] = useState({
        ingredient: '',
        category: ''
    })

    useEffect(() => {
        fetchCategories()
    }, []);

    function handleChange (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) {
        setSearchFilters({
            ...searchFilters,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if(Object.values(searchFilters).includes('')) {
            showNotification({
                text: 'Todos los campos son obligatorios', 
                error: true
            })
            return
        }

        // Consultar API
        searchRecipes(searchFilters)
    }


  return (
    <header className={isHome ? 'bg-header bg-cover bg-center shadow-xl' : 'bg-slate-800 shadow-xl'}>
        <div className="mx-auto container px-5 py-16">

            <div className="flex justify-between items-center">
                
                <div className="">
                    <img className="w-32" src="/logo.svg" alt="logotipo" />
                </div>

                <nav className="flex gap-4">
                    <NavLink 
                        className={({isActive}) =>
                            isActive ? 'text-orange-500 text-lg uppercase font-bold underline underline-offset-8' : 'text-white text-lg uppercase font-bold hover:text-orange-500 transition-all'
                    } 
                        to='/'
                    >Inicio</NavLink>
                    <NavLink 
                        className={({isActive}) =>
                            isActive ? 'text-orange-500 text-lg uppercase font-bold underline underline-offset-8' : 'text-white text-lg uppercase font-bold hover:text-orange-500 transition-all'
                    } 
                        to='/favoritos'
                    >Favoritos</NavLink>
                    
                </nav>
            </div>

            {isHome && (
                <form onSubmit={handleSubmit} className="md:w-1/2 2xl:w-1/3 bg-orange-500 my-32 p-10 rounded-lg shadow-xl space-y-6">

                    

                    <div className="space-y-4">
                        <label 
                            htmlFor="ingredient"
                            className="block text-white uppercase font-extrabold text-lg"
                        >
                            Nombre o Ingredientes
                        </label>

                        <input 
                            type="text" 
                            id="ingredient"
                            name="ingredient"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            placeholder="Nombre o Ingrediente Ej. Vodka, Tequila, Cafe"
                            onChange={handleChange}
                            value={searchFilters.ingredient}
                        />
                    </div>

                    <div className="space-y-4">
                        <label 
                            htmlFor="category"
                            className="block text-white uppercase font-extrabold text-lg"
                        >
                            Categoria
                        </label>

                        <select  
                            id="category"
                            name="category"
                            className="p-3 w-full rounded-lg focus:outline-none"
                            onChange={handleChange}
                            value={searchFilters.category}
                        >
                            <option value="">-- Seleccione --</option>
                            {categories.drinks.map(category => (
                                <option key={category.strCategory} value={category.strCategory}>
                                    {category.strCategory}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input 
                        type="submit" 
                        value="Buscar Recetas" 
                        className="cursor-pointer bg-orange-800 text-white p-3 w-full uppercase font-extrabold rounded-lg hover:bg-orange-950 transition-all"
                    />
                </form>
            )}

        </div>
    </header>
  )
}
