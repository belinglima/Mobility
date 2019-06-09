import styled from "styled-components";
import "../../styles/global"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
`;

export const Form = styled.form`
  width: 400px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 300px;
    margin: 5px 0 30px;
  }
  p {
    color: #fc6000;
    margin-bottom: 10px;
    border: 1px solid #fc6000;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    flex: 1;
    padding: 20px 0;
    margin-bottom: 10px;
    padding: 10px 20px;
    border-radius: 52px; 
    color: #00a651;
    font-size: 15px;
    width: 100%;
    border: 1px solid #018f46;
    &::placeholder {
      color: #00a651;
    }
  }
  button {
    color: #018f46;
    font-size: 16px;
    background: #ffd301;
    height: 46px;

    border: 0;
    border-radius: 52px;
    width: 100%;
  }
  hr {
    margin: 20px 0;
    border: none;
    border-bottom: 1px solid #cdcdcd;
    width: 100%;
  }
  a {
    font-size: 16;
    color: #018f46;
    text-decoration: none;
  }
`;