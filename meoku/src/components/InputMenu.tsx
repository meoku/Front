import { css } from "@emotion/react";
import styled from "@emotion/styled";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import minusIco from "../assets/minus.svg";
import plusIco from "../assets/plus.svg";

const InputMenus = () => {
  const [item1, setItem1] = useState<[string, boolean][]>([
    ["밥", false],
    ["국", false],
    ["반찬1", false],
    ["반찬2", false],
    ["반찬3", false],
    ["반찬4", false],
  ]);
  const [item2, setItem2] = useState<[string, boolean][]>([
    ["밥1", false],
    ["국2", false],
    ["반찬11", false],
    ["반찬22", false],
    ["반찬33", false],
    ["반찬44", false],
  ]);
  const [item3, setItem3] = useState([["PLUS1"], ["PLUS2"]]);
  const [item4, setItem4] = useState([["SALAD"]]);
  const [item5, setItem5] = useState([["SIMPLE"]]);
  const [item6, setItem6] = useState<[string, boolean][]>([
    ["밥1", false],
    ["국2", false],
    ["반찬11", false],
    ["반찬22", false],
    ["반찬33", false],
    ["반찬44", false],
  ]);
  const [item7, setItem7] = useState([["PLUS1"], ["PLUS2"]]);

  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);
  useEffect(() => {
    axios.get("/user").then((res) => console.log(res.data));
  }, []);
  const dragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    dragItem.current = position;
    console.log("darg start", e);
  };

  const dragEnter = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    console.log(e);
    console.log(dragItem);
    console.log(dragOverItem);
    dragOverItem.current = position;
    console.log("moving...");
  };

  const drop = (
    e: React.DragEvent<HTMLDivElement>,
    item: [string, boolean][],
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
    width: 8rem;
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
      <div>월</div>
      <div
        css={css`
          /* display: flex;
          flex-direction: column; */
          padding: 30px;
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
                newArr.push(["ex1", false]);
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
                  item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem1(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
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
                newArr.push(["ex1", false]);
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
                  item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem2(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
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
                newArr.push(["ex1", false]);
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
                  item[1] = item[1] == true ? false : true;
                  newArr[idx] = item;
                  setItem6(newArr);
                }}
              >
                {item[1] == true ? "yes" : "no"}
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
