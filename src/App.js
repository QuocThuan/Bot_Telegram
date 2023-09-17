import BaiTapGlassesComponent from "./BaiTapGlasses/BaiTapGlassesComponent";

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundImage: "url(./glassesImage/background.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <BaiTapGlassesComponent />
    </div>
  );
}

export default App;
