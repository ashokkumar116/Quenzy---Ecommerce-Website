import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export const SampleNextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-primary hover:text-secondary"
            onClick={onClick}
        >
            <MdNavigateNext size={30} />
        </div>
    );
};

export const SamplePrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-primary hover:text-secondary"
            onClick={onClick}
        >
            <MdNavigateBefore size={30} />
        </div>
    );
};
export const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute right-2 top-1/2 transform bg-base-100 -translate-y-1/2 z-10 cursor-pointer text-primary hover:text-secondary"
            onClick={onClick}
        >
            <MdNavigateNext size={30} />
        </div>
    );
};

export const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div
            className="absolute left-2 top-1/2 transform bg-base-100 -translate-y-1/2 z-10 cursor-pointer text-primary hover:text-secondary"
            onClick={onClick}
        >
            <MdNavigateBefore size={30} />
        </div>
    );
};
