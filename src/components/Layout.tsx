/* Library Imports */
import * as React from "react";
import { Grid } from "semantic-ui-react";

/* Component Imports */

/* Style Imports */

interface Props {
  children: any;
}
export function Layout(props: Props) {
  const { children } = props;
  return (
    <>
      <h1>header here</h1>
      <br />
      <br />
      {children}
      <br />
      <br />
      <h1>footer here</h1>
    </>
  );
}
