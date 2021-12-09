@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");

html {
  user-select: none;
  -webkit-user-drag: none;
  background-color: #202124;
  color: #ddd;
  font-family: "Roboto", sans-serif;
  cursor: default;
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 0px;
}
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#listPage {
  text-align: center;
  .heading {
    font-weight: 500;
    font-size: 1.5rem;
    padding-top: 20px;
    color: rgb(201, 206, 207);
    border-top: 3px solid rgb(85, 85, 85);
  }
  #ownerItem {
    article {
      .name {
        color: hsl(0, 100%, 80%);
      }
      .mac {
        margin: 0 !important;
        margin-top: 10px !important;
      }
      .p {
        display: none;
      }
    }
  }
  #userItem {
    article {
      .name {
        color: hsl(240, 100%, 85%);
      }
    }
  }
  #otherItem {
    article {
      .name {
        color: hsl(0, 100%, 90%);
      }
      .mac {
        margin: 0px !important;
        margin-top: 10px !important;
      }
      .p {
        display: none;
      }
    }
  }
  .mainItemCon {
    .con {
      margin: 10px;
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      grid-gap: 10px;
    }
  }
  article {
    background-color: #ffffff10;
    padding: 15px 10px;
    border-radius: 5px;
    cursor: pointer;
    .name > span {
      font-size: 17px;
      font-weight: bold;
      letter-spacing: 1.1px;
      font-family: "Rubik", sans-serif;
      cursor: crosshair;
    }
    .mac {
      color: #ffffff99;
      font-family: "Roboto Mono", monospace;
      font-size: 19px;
      margin: 10px;
    }
    .p {
      font-size: 15px;
      color: #999;
      font-family: "Rubik", sans-serif;
    }
  }
}
noscript {
  text-align: center;
}
#logInPage {
  color: #ddd;
  text-align: center;
  display: flex;
  height: 100vh;
  min-height: fit-content;
  justify-content: space-around;
  flex-direction: column;

  #loginBody {
    margin-bottom: 10vh;
    input {
      font-size: 1.3rem;
    }
    input,
    .icon,
    #btn {
      color: #ddd;
      background: #ffffff40;
      outline: 0;
      border: 0;
    }
    .icon {
      font-size: 1.1rem;
      position: absolute;
      color: #a7abb8;
      background: none !important;
      margin-top: 8px;
      margin-left: 8px;
    }
    input {
      padding: 5px 5px 5px 35px;
      border-radius: 5px;
      margin-bottom: 15px;
    }
    #btn {
      &:active {
        opacity: 0.5;
      }
      border-radius: 5px;
      cursor: pointer;
      padding: 5px 10px;
      font-size: 1.2rem;
    }
  }
}
@media screen and (max-width: 1100px) {
  /*-- When using Tablet || Smaller than 1000px --*/
  .mainItemCon {
    .con {
      grid-template-columns: repeat(3, 1fr) !important;
    }
  }
}
@media screen and (max-width: 850px) {
  /*-- When using Tablet || Smaller than 1000px --*/
  .mainItemCon {
    .con {
      grid-template-columns: repeat(2, 1fr) !important;
    }
  }
}
