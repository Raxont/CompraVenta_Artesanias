import CategoryCard from "./CategoryCard"; // Importa el componente que creaste antes

const CategoryList = ({ categories }) => {
  return (
    <div className="w-5/6 overflow-x-auto">
      <div className="grid grid-flow-col grid-rows-2 gap-4">
        {/* Mapea las categorías para renderizar un CategoryCard por cada una */}
        {categories.map((category, index) => (
          <CategoryCard key={index} tittle={category.title} iconPath={category.iconPath} />
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
