// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import './styles/button.scss';

export enum EButtonKind {
    PRIMARY = 'primary',
    DEFAULT = 'default'
}

export interface IButton {
    kind?: EButtonKind,
    [x: string]: any
}

export const Button = (props: IButton) => {
    const { kind, ...other } = props;
    const className = kind === EButtonKind.PRIMARY ? "btn-primary" : "btn-default";
    return (
        <button className={`btn ${className}`} {...other} />
    );
}