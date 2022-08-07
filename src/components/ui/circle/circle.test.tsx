import { render, screen } from '@testing-library/react';
import { ElementStates } from '../../../types/element-states';
import { Circle } from './circle';

describe('Component Circle', () => {
  it('Circle without letter', () => {
    const circle = render(<Circle />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle with letter', () => {
    const circle = render(<Circle letter={'a'} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle with head', () => {
    const circle = render(<Circle head={'a'} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle with tail', () => {
    const circle = render(<Circle tail={'a'} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle with react element in tail', () => {
    const circle = render(<Circle tail={<Circle />} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle with index', () => {
    const circle = render(<Circle index={1} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle is small', () => {
    const circle = render(<Circle isSmall />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle state is default', () => {
    const circle = render(<Circle state={ElementStates.Default} />);
    expect(circle).toMatchSnapshot();
  });
  it('Circle state is changing', () => {
    const circle = render(<Circle state={ElementStates.Changing} />);
    expect(circle).toMatchSnapshot();
  });

  it('Circle state is modified', () => {
    const circle = render(<Circle state={ElementStates.Modified} />);
    expect(circle).toMatchSnapshot();
  });
});
