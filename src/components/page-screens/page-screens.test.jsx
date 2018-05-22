import React from 'react';
import { shallow, mount } from 'enzyme';
import ScreenPage from './page-screens';

describe('Screen page', () => {
    /* https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md */
    it('should render shallowly', () => {
        expect(shallow(<ScreenPage pageKey='0' />)).toMatchSnapshot();
    });
    /* https://github.com/airbnb/enzyme/blob/master/docs/api/render.md */
    it('should render deeply', () => {
        expect(mount(<ScreenPage pageKey='1' />)).toMatchSnapshot();
    });
});
