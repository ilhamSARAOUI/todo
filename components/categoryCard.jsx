import { MdOutlineCategory } from "react-icons/md";


function categoryCard({ category }) {
  return (
    <div className="category-card">
      <MdOutlineCategory className="categoryIcon" />
      <h4>{category.name}</h4>

      <p>
        Lorem ipsum dolor sit amet coneres, reprehen
        minima similique? samus voluptate es
        dolorem dignissimos ne
      </p>
    </div>
  );
}

export default categoryCard;
