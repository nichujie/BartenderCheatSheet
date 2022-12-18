import { useEffect, useState } from "react";

export default function DetailView(props) {
  const { drinkDetail, userData, onAddDrinkToList, onRemoveDrinkFromList } = props;
  const { data: detailResult, loading, error } = drinkDetail;
  const [ingredients, setIngredients] = useState([]);
  const drinkList = userData.drinkList ?? [];
  const isDrinkInList = drinkList.includes(detailResult?.idDrink);

  useEffect(() => {
    if (!detailResult) return;
    const ingredientsArray = Object.entries(detailResult)
      .filter((entry) => entry[0].search("strIngredient") === 0)
      .map((e) => e[1])
      .filter((v) => !!v);
    setIngredients(ingredientsArray);
  }, [detailResult]);

  if (error) return <div>Oops! Failed to fetch drink detail</div>;
  if (loading)
    return (
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          alt="loading icon"
          className=""
        />
      </div>
    );
  if (!detailResult) return <div>Cannot find drink</div>;

  return (
    <div className="m-10 card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src={detailResult.strDrinkThumb} alt="Picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{detailResult.strDrink}</h2>
        <div>
          <span className="font-semibold">Category:</span>
          {detailResult.strCategory}
        </div>
        <div>
          <span className="font-semibold">Glass:</span>
          {detailResult.strGlass}
        </div>
        <div>
          <span className="font-semibold">Alcoholic:</span>
          {detailResult.strAlcoholic}
        </div>
        <div>
          <span className="font-semibold">Instructions:</span>
          {detailResult.strInstructions}
        </div>
        <div>
          <span className="font-semibold">Ingredient:</span> {ingredients.join(", ")}
        </div>
        <div>
          {/* <button className="btn btn-primary">add to list</button> */}
          {isDrinkInList ? (
            <button
              className="btn btn-error"
              onClick={() => onRemoveDrinkFromList(detailResult.idDrink)}
            >
              Remove from list
            </button>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => onAddDrinkToList(detailResult.idDrink)}
            >
              Add to my favorite
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
