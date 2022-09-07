import BunTop from '../../assets/images/bun_top.png'
import BunBottom from '../../assets/images/bun_bottom.png'
import { useAuth } from "../../hooks"
import { useQuery } from "react-query"
import { baseUrl, fetchIngredients } from "../../api"
import Spinner from "../../components/Spinner"
import { IngredientsType } from "../../types"
import { useCallback, useState } from "react"
import Ingredient from "../../components/Ingredient"

export default function Builder() {
  const hasAuthorized = useAuth({ isRedirect: true })
  const { data, status } = useQuery('ingredients', fetchIngredients)
  const [bunIngresState, setBunIngresState] = useState<Array<IngredientsType>>([])

  const addBun = useCallback((ingredient: IngredientsType) => {
    setBunIngresState(bunIngresState.concat(ingredient))
  }, [bunIngresState])

  const removeBun = useCallback((index: number) => {
    const list = bunIngresState.slice(0, index).concat(bunIngresState.slice(index + 1, bunIngresState.length))
    setBunIngresState(list)
  }, [bunIngresState])

  return (<>
    {hasAuthorized &&
      <div className="bg-white">
        <div className="mx-auto max-w-2xl sm:max-w-4xl py-8 px-4">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 py-2">Burger Preview</h2>
            <p className="text-sm text-orange-300">Tips: Click the ingredient in the burger preview to remove</p>
            <div className="flex flex-col mx-auto px-4 py-8 max-w-xs">
              <img src={BunTop} alt="burger top" className="z-[1001]" />
              <div style={{ marginTop: -36 * (bunIngresState.length) - 20 }}>
                {bunIngresState.slice().reverse().map((item: IngredientsType, index: number) => (
                  <button key={index} className="w-full" onClick={() => removeBun(bunIngresState.length - index - 1)}>
                    <img src={`${baseUrl}/img/${item.src}`} alt="bun-ingredient" className="w-full h-16 object-center object-fill scale-x-95 relative" style={{ zIndex: 1000 - index, bottom: -36 * (bunIngresState.length - index) }} />
                  </button>
                ))}
                <img src={BunBottom} alt="burger bottom" />
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-gray-900 py-2">Ingredients</h2>
            <p className="text-sm text-orange-300">Tips: Click the ingredient below to add</p>
            <div className="mt-12 grid grid-cols-3 gap-x-12">
              {status === 'loading' && <Spinner className="text-tasty" />}
              {data && data instanceof Array && data.map((item: IngredientsType) => (
                <Ingredient item={item} onClick={() => addBun(item)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    }
  </>)
}

