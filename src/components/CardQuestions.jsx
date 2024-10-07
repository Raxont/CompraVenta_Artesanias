const CardQuestions = ({ info }) => {
  return (
    <button className="text-left bg-primary dark:bg-dark-tertiary text-light dark:text-dark-bg font-light hover:bg-gray-300  py-2 px-4 rounded w-full h-[60px]">
        {info}
    </button>
  );
};

export default CardQuestions;
