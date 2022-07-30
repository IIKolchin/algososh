import { render } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
    it('Button with text', () => {
        const button = render(< Button text='Добавить' />)
        expect(button).toMatchSnapshot();
    })

    it('Button without text', () => {
        const button = render(< Button />)
        expect(button).toMatchSnapshot();
    })

    it('Button disabled', () => {
        const button = render(< Button disabled/>)
        expect(button).toMatchSnapshot();
    })

    it('Button isLoader', () => {
        const button = render(< Button isLoader/>)
        expect(button).toMatchSnapshot();
    })
})