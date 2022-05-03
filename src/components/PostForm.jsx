import React, { useState } from "react";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import SelectToken from "./UI/select/SelectToken";
import SaleOrBuy from "./UI/select/SaleOrBuy";

const PostForm = ({ create }) => {
  const [post, setPost] = useState({ exchange: "", Token: "", body: "" });

  const addNewPost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      id: Date.now()
    };
    create(newPost);
    setPost({ exchange: "", Token: "", body: "" });
  };

  return (
    <form>
      <SelectToken
        value={post.Token}
        defaultValue="Токен"
        onChange={(e) => setPost({ ...post, Token: e.value })}
        options={[
          { value: "token", name: "USDT" },
          { value: "token", name: "DAI" },
          { value: "token", name: "USDC" }
        ]}
      />
      <SaleOrBuy
        value={post.exchange}
        defaultValue="Покупка/продажа"
        onChange={(e) => setPost({ ...post, exchange: e.target.value })}
        options={[
          { value: "buy", name: "Покупка" },
          { value: "sale", name: "Продажа" }
        ]}
      />

      {/*Неуправляемый\Неконтролируемый компонент*/}
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Количество"
      />

      <MyButton onClick={addNewPost}>Создать пост</MyButton>
    </form>
  );
};

export default PostForm;
