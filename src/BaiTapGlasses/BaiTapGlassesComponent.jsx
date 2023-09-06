import React, { Component } from "react";
import HinhAnhComponent from "./HinhAnhComponent";
import style from "./style.module.css";

export default class BaiTapGlassesComponent extends Component {
  arrGlasses = [
    {
      id: 1,
      price: 30,
      name: "GUCCI G8850U",
      url: "./glassesImage/v1.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 2,
      price: 50,
      name: "GUCCI G8759H",
      url: "./glassesImage/v2.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 3,
      price: 30,
      name: "DIOR D6700HQ",
      url: "./glassesImage/v3.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 4,
      price: 70,
      name: "DIOR D6005U",
      url: "./glassesImage/v4.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 5,
      price: 40,
      name: "PRADA P8750",
      url: "./glassesImage/v5.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 6,
      price: 60,
      name: "PRADA P9700",
      url: "./glassesImage/v6.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 7,
      price: 80,
      name: "FENDI F8750",
      url: "./glassesImage/v7.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 8,
      price: 100,
      name: "FENDI F8500",
      url: "./glassesImage/v8.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
    {
      id: 9,
      price: 60,
      name: "FENDI F4300",
      url: "./glassesImage/v9.png",
      desc: "Light pink square lenses define these sunglasses, ending with amother of pearl effect tip. ",
    },
  ];
  state = {
    display: "none",
    backgroundImage: "url(./../../public/glassesImage/v3.png)",
    name: "GUCCI G8850U",
  };

  changGlasses = (id) => {
    console.log(id);
    for (let item of this.arrGlasses) {
      if (item.id == id) {
        console.log(item.id);
        let { url, name } = item;
        console.log(url);
        this.setState({
          display: "inline-block",
          backgroundImage: url,
          name: name,
        });
      }
    }
  };
  render() {
    return (
      <div>
        <h1 className="text-center py-5">TRY GLASSES APP ONLINE</h1>
        <div className="py-5">
          <div className="d-flex justify-content-center w-25 mx-auto position-relative ">
            <img className="w-50 " src="./glassesImage/model.jpg" alt="" />
            <div
              style={{
                display: this.state.display,
                position: "absolute",
                top: "60px",
                left: "134px",
                backgroundImage: `url(${this.state.backgroundImage})`,
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "30%",
                height: "15vh",
                zIndex: "5",
              }}
            ></div>
            <div
              style={{
                display: this.state.display,
                position: "absolute",
                bottom: "0",
                left: "103px",
                width: "188px",
                zIndex: "5",
                fontSize: "10px",
              }}
            >
              <h5 className="text-primary">{this.state.name}</h5>
              <p className="mb-0">
                Light pink square lenses define these sunglasses, ending with
                amother of pearl effect tip.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="py-4 d-flex justify-content-center my-5">
          <div
            className="w-50 mx-auto py-4"
            id="showGlasses"
            style={{ background: "grey" }}
          >
            <div className="row px-2">
              {this.arrGlasses.map((item) => {
                console.log(item.id);
                return (
                  <div className="col-2">
                    <button
                      className="w-100 my-2"
                      id={item.id}
                      onClick={() => this.changGlasses(item.id)}
                    >
                      <img className="w-100" src={item.url} alt="" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
