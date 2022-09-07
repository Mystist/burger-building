import { baseUrl } from "../../api";
import { IngredientsType } from "../../types";

export default function Ingredient({item, onClick}: { item: IngredientsType, onClick: () => void }) {
  return (<>
    <div key={item.id} className="relative">
      <div className="relative w-full overflow-hidden rounded-lg">
        <button className="w-full" onClick={onClick}>
          <img src={`${baseUrl}/img/${item.src}`} alt="ingredient" className="h-[70px] w-full object-contain object-center" />
        </button>
      </div>
      <div className="relative mt-4 text-center">
        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
      </div>
    </div>
  </>)
}