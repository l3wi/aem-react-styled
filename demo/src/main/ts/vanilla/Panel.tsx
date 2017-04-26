import * as React from "react";
import styled from 'styled-components';

console.log('sup')

export class Panel extends React.Component<any, any> {
    render() {
        let label = this.props.label || "please select a label 3";
        return (
            <div>
              <Title>{label}</Title>
              {this.props.children}
            </div>
        );
    }
}

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;
