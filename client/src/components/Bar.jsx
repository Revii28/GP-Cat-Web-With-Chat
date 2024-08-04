export default function Bar({ statName, stat }) {
  return (
    <>
      <div className="mb-1 text-base font-medium dark:text-white">
        {statName}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
        <div
          className="bg-light-third h-2.5 rounded-full dark:bg-gray-300"
          style={{ width: stat * 20 + "%" }}
        />
      </div>
    </>
  );
}
