const Home = () => {
    return (
        <div>
            {[...new Array(25)].map((el) => (
                <div className="h-8 w-full bg-green-300 block mb-4"></div>
            ))}
        </div>
    );
};
export default Home;
