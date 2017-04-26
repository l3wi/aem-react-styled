import * as React from "react";
import * as resource from "aem-react-js/component/ResourceComponent";

import styled from 'styled-components';

import Card from './card';
import { Category, H1, H2 } from './text'

export default class Hero extends resource.ResourceComponent<any, any,  any> {

  public renderBody() {
        return (
            <Headrow>
              <Column primary>
                <Card>
                  <Category>Move well</Category>

                </Card>
              </Column>
              <Column>
                <Card>
                  <Category>Move well</Category>
                </Card>
                <Card>
                  <Category>Move well</Category>
                </Card>
              </Column>
            </Headrow>
        );
    }

  public getDepth(): number {
      return 2;
  }
}

const Headrow = styled.section`
  background: #eee;
  color: white;
  display: flex;
  flex-direction: row;
  height: 640px;
`;
const Column = styled.div`
  display: flex;
  flex-grow: 1
  flex-direction: column;
  width: ${props => props.primary ? '60%' : '40%'};
`;
