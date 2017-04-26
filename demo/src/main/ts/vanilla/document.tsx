import * as React from "react";
import * as styleSheet from 'styled-components/lib/models/StyleSheet'

export class Document extends React.Component<any, any> {
    render() {
        return <head>
            <style dangerouslySetInnerHTML={{ __html: styleSheet.rules().map(rule => rule.cssText).join('\n') }} />
            Test
        </head>;
    }
}
