import Styled from "styled-components";

export const StyledMessageWrapper = Styled.div`
    display: flex;
    align-items: center;
    position: absolute;
    bottom: 10px;
    left: 10px;
    right: 20px;
    form {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        position: relative;
        input {
            border-radius: 50px;
            height: 65px;
            width: 100%;
        }
        button {
            border: none;
            background-color: #2f80ed;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 10px;
            width: 50px;
            height: 50px;
            padding: 13px;
            &:hover {
                background-color: #2f80ed;
            }
            &.attach {
                right: 60px;
                background-color: transparent;
                svg {
                    fill: gray
                }
            }
        }
        svg {
            fill: #fff
        }
    }
`;
