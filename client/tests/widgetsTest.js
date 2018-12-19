// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card,Row,Button} from '../src/widgets.js';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('Alert tests', () => {
  const wrapper = shallow(<Alert />);

  it('initially', () => {
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });

  it('after danger', done => {
    Alert.danger('test');

    setTimeout(() => {
      let instance: ?Alert = Alert.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

      expect(wrapper.find('button.close')).toHaveLength(1);

      done();
    });
  });

  it('after clicking close button', () => {
    wrapper.find('button.close').simulate('click');
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });
});


describe('Card render tests', () => {
   it('basic use',() => {
      const wrapper = render(
        <Card title="title">texts</Card>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
   })
});

describe('Buttontests', () => {
   it('Button Danger use',() => {
       const wrapper = render(
        <Button.Danger> ButtonDanger </Button.Danger>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
   });

   it('Button Light use', () => {
       const wrapper = render(
        <Button.Light> ButtonLight </Button.Light>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('Button Success use', () => {
        const wrapper = render(
         <Button.Success> ButtonSucess </Button.Success>
       );
       expect(toJson(wrapper)).toMatchSnapshot();
     });
});


describe('Row render tests', () => {
   it('basic use',() => {
      const wrapper = render(
        <Row>
        <p>1</p>
        <p>2</p>
        </Row>
      );
      expect(toJson(wrapper)).toMatchSnapshot();
    })
  });
