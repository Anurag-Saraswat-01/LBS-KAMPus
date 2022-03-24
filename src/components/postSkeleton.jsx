import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import { Container } from "react-bootstrap";
import Stack from "@mui/material/Stack";

export default function Variants() {
  return (
    <Container>
      <Stack spacing={1}>
        <Skeleton className="skeleton" variant="text" />
        <Skeleton
          className="skeleton"
          variant="circular"
          width={60}
          height={60}
        />
        <Skeleton
          className="skeleton"
          variant="rectangular"
          width={360}
          height={170}
        />
      </Stack>
    </Container>
  );
}
