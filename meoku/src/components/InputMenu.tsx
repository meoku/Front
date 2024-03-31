import { css } from "@emotion/react";
import styled from "@emotion/styled";
// import axios from "axios";
import { useEffect, useRef, useState } from "react";
import minusIco from "../assets/minus.svg";
import plusIco from "../assets/plus.svg";
import { menuDetail } from "../type/type";
interface InputMenusProps {
  menuData: menuDetail[];
  day: string;
  handleMenuData: (data: menuDetail[], day: string) => void;
}
const InputMenus = ({ menuData, day, handleMenuData }: InputMenusProps) => {
  const [item1, setItem1] = useState<[string, string][]>([
    ["밥", "N"],
    ["국", "N"],
    ["반찬1", "N"],
    ["반찬2", "N"],
    ["반찬3", "N"],
    ["반찬4", "N"],
  ]);
  const [item2, setItem2] = useState<[string, string][]>([
    ["밥1", "N"],
    ["국2", "N"],
    ["반찬11", "N"],
    ["반찬22", "N"],
    ["반찬33", "N"],
    ["반찬44", "N"],
  ]);
  const [item3, setItem3] = useState([["PLUS1"], ["PLUS2"]]);
  const [item4, setItem4] = useState([["SALAD"]]);
  //const [item5, setItem5] = useState([["SIMPLE"]]);
  const [item6, setItem6] = useState<[string, string][]>([
    ["밥1", "N"],
    ["국2", "N"],
    ["반찬11", "N"],
    ["반찬22", "N"],
    ["반찬33", "N"],
    ["반찬44", "N"],
  ]);
  const [item7, setItem7] = useState([["PLUS1"], ["PLUS2"]]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  useEffect(() => {
    const data = menuData;
    if (data !== null) {
      setItem1([
        [data[0].mainMenuName || "", data[0].mainMenuYn],
        [data[0].menu1Name || "", "N"],
        [data[0].menu2Name || "", "N"],
        [data[0].menu3Name || "", "N"],
        [data[0].menu4Name || "", "N"],
        [data[0].menu5Name || "", "N"],
      ]);
      setItem2([
        [data[1].mainMenuName || "", data[1].mainMenuYn],
        [data[1].menu1Name || "", "N"],
        [data[1].menu2Name || "", "N"],
        [data[1].menu3Name || "", "N"],
        [data[1].menu4Name || "", "N"],
        [data[1].menu5Name || "", "N"],
      ]);
      setItem3([
        //[data[2].mainMenuName, data[2].mainMenuYn],
        [data[2].menu1Name || ""],
        [data[2].menu2Name || ""],
      ]);
      setItem4([[data[3].mainMenuName || "", data[3].mainMenuYn]]);
      setItem6([
        [data[4].mainMenuName || "", data[4].mainMenuYn],
        [data[4].menu1Name || "", "N"],
        [data[4].menu2Name || "", "N"],
        [data[4].menu3Name || "", "N"],
        [data[4].menu4Name || "", "N"],
        [data[4].menu5Name || "", "N"],
      ]);
      setItem7([
        // [data[5].mainMenuName, data[5].mainMenuYn],
        [data[5].menu1Name || "", "N"],
        [data[5].menu2Name || "", "N"],
      ]);
    }
    // axios.get("/user").then((res) => console.log(res.data));
  }, [menuData]);
  useEffect(() => {
    //handleMenuData([[]...item1,...item2,...item3])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    handleMenuData([item1, item2, item3, item4, item6, item7], day);
  }, [item1, item2, item3, item4, item6, item7]);
  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    console.log(e);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    console.log(e);
    console.log(dragItem);
    console.log(dragOverItem);
    dragOverItem.current = position;
  };

  const drop = (
    e: React.DragEvent<HTMLDivElement>,
    item: [string, string][],
    menu: string
  ) => {
    const newItems = [...item];
    const dragItemValue = newItems[dragItem.current!];
    newItems.splice(dragItem.current!, 1);
    newItems.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    if (menu == "first") setItem1(newItems);
    else if (menu == "second") setItem2(newItems);
    console.log(e);
  };
  const drop2 = (
    e: React.DragEvent<HTMLDivElement>,
    item: string[][],
    menu: string
  ) => {
    const newItems = [...item];
    const dragItemValue = newItems[dragItem.current!];
    newItems.splice(dragItem.current!, 1);
    newItems.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;
    if (menu == "3") return;
    console.log(e);
  };
  const InputTextMenu = styled.input`
    width: 6rem;
  `;
  const InputMenu = styled.div`
    display: flex;
    flex-direction: column;
  `;
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto 0;
      `}
    >
      <div>{day}</div>
      <div
        css={css`
          /* display: flex;
          flex-direction: column; */
          padding: 15px;
          border: 1px solid black;
          border-radius: 50px;
        `}
      >
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              한식
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item1];
                newArr.push(["ex1", "N"]);
                setItem1(newArr);
              }}
            />
          </div>
          {item1.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item1];
                  newArr.splice(idx, 1);
                  setItem1(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop(e, item1, "first")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              <p
                onClick={() => {
                  const newArr = [...item1];
                  item[1] = item[1] == "Y" ? "N" : "Y";
                  newArr[idx] = item;
                  setItem1(newArr);
                }}
              >
                {item[1] == "Y" ? "yes" : "no"}
              </p>
            </div>
          ))}
        </InputMenu>
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              일품
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item2];
                newArr.push(["ex1", "N"]);
                setItem2(newArr);
              }}
            />
          </div>
          {item2.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item2];
                  newArr.splice(idx, 1);
                  setItem2(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop(e, item2, "second")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              <p
                onClick={() => {
                  const newArr = [...item2];
                  item[1] = item[1] == "Y" ? "N" : "Y";
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == "Y" ? "yes" : "no"}
              </p>
            </div>
          ))}
        </InputMenu>
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              plus
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item3];
                newArr.push([]);
                setItem3(newArr);
              }}
            />
          </div>
          {item3.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item3];
                  newArr.splice(idx, 1);
                  setItem3(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop2(e, item3, "3")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              {/* <p
                onClick={() => {
                  const newArr = [...item2];
                  //item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
              </p> */}
            </div>
          ))}
        </InputMenu>
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              샐러드팩
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item4];
                newArr.push([]);
                setItem4(newArr);
              }}
            />
          </div>
          {item4.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item4];
                  newArr.splice(idx, 1);
                  setItem4(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop2(e, item4, "4")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              {/* <p
                onClick={() => {
                  const newArr = [...item2];
                  //item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
              </p> */}
            </div>
          ))}
        </InputMenu>
        {/*
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              간편식
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item5];
                newArr.push([]);
                setItem5(newArr);
              }}
            />
          </div>
          {item5.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item5];
                  newArr.splice(idx, 1);
                  setItem5(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop2(e, item5, "5")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              {/* <p
                onClick={() => {
                  const newArr = [...item2];
                  //item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
              </p> */}
        {/* </div>
          ))} */}
        {/* </InputMenu>/ */}
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              석식
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item6];
                newArr.push(["ex1", "N"]);
                setItem6(newArr);
              }}
            />
          </div>
          {item6.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item2];
                  newArr.splice(idx, 1);
                  setItem6(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop(e, item6, "6")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              <p
                onClick={() => {
                  const newArr = [...item6];
                  item[1] = item[1] == "Y" ? "N" : "Y";
                  newArr[idx] = item;
                  setItem6(newArr);
                }}
              >
                {item[1] == "Y" ? "yes" : "no"}
              </p>
            </div>
          ))}
        </InputMenu>
        <InputMenu>
          <div
            css={css`
              display: flex;
              justify-content: center;
              margin-top: 10px;
            `}
          >
            <h6
              css={css`
                padding-top: 2px;
              `}
            >
              plus
            </h6>
            <img
              css={css`
                width: 20px;
                cursor: pointer;
              `}
              src={plusIco}
              onClick={() => {
                const newArr = [...item7];
                newArr.push([]);
                setItem7(newArr);
              }}
            />
          </div>
          {item7.map((item, idx) => (
            <div
              css={css`
                display: flex;
              `}
            >
              <img
                css={css`
                  width: 20px;
                  cursor: pointer;
                `}
                onClick={() => {
                  const newArr = [...item7];
                  newArr.splice(idx, 1);
                  setItem7(newArr);
                }}
                src={minusIco}
              />
              <InputTextMenu
                key={idx}
                draggable
                onDragStart={(e) => dragStart(e, idx)}
                onDragEnter={(e) => dragEnter(e, idx)}
                onDragEnd={(e) => drop(e, item2, "second")}
                onDragOver={(e) => e.preventDefault()}
                defaultValue={item[0]}
              ></InputTextMenu>
              {/* <p
                onClick={() => {
                  const newArr = [...item2];
                  //item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
              </p> */}
            </div>
          ))}
        </InputMenu>
      </div>
    </div>
  );
};
export default InputMenus;
