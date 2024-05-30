import { Suspense } from "react";
import { Await, Form as RouterForm, useAsyncError, useAsyncValue } from "react-router-dom";
import { Form, Badge, Col, Row, Stack, Alert, ToggleButton, ButtonGroup } from "react-bootstrap";
import { CreateForm, FormType } from "./createForm.tsx";
import { Fallback } from "./fallback.tsx";
import { ToggleButtonType } from "react-bootstrap/esm/ToggleButton";

type Props = {
  forms: FormType[];
  searchies: Record<string, string>[];
  query: Record<string, string>;
  setQuery: (query: Record<string, string>) => void;
  submit: (query: Record<string, string>, options: { replace: boolean }) => void;
  isSearching: boolean;
};

const Error = () => {
  const error = useAsyncError() as Error;
  const value = useAsyncValue();
  console.log("error", error);
  console.log("value", value);

  return (
    <Alert variant="danger">
      <i className="bi bi-exclamation-triangle-fill me-1" />
      {error.name} : {error.message}
    </Alert>
  );
};

/**
 *
 * @param props
 * @returns
 */
export function SearchArea(props: Props): JSX.Element {
  const { forms, searchies, query, setQuery, submit, isSearching } = props;

  //TODO
  type ButtonType = {
    id: string;
    value: string;
    label: string;
    variant: string;
    type: ToggleButtonType;
    name: string;
  }[];
  const buttons: ButtonType = [
    {
      id: "limit-10",
      value: "10",
      label: "10",
      variant: "outline-secondary",
      type: "radio",
      name: "limit",
    },
    {
      id: "limit-100",
      value: "100",
      label: "100",
      variant: "outline-secondary",
      type: "radio",
      name: "limit",
    },
    {
      id: "limit-all",
      value: "",
      label: "All",
      variant: "outline-secondary",
      type: "radio",
      name: "limit",
    },
  ];

  return (
    <>
      <Form as={RouterForm} role="search" onChange={(e) => submit(e.currentTarget, { replace: true })}>
        <fieldset disabled={isSearching}>
          <fieldset>
            <legend className="h6">絞り込む</legend>
            <Row className="gx-2 gy-2">
              <Suspense
                fallback={<Fallback />}
                children={
                  <Await
                    resolve={searchies}
                    errorElement={<Error />}
                    children={(searchies) => (
                      <>
                        {forms.map((form, index) => {
                          const { controlId, name } = form;

                          return (
                            <Col key={index} md={controlId === "keyword" ? 12 : 6} lg={controlId === "keyword" ? 12 : 2}>
                              <CreateForm
                                {...{
                                  form,
                                  value: query[name] ?? "",
                                  event: (e) => setQuery({ ...query, [name]: e.currentTarget.value }),
                                  option: searchies[controlId],
                                }}
                              />
                            </Col>
                          );
                        })}
                        <Stack direction="horizontal" gap={2}>
                          {forms.map((form, index) => {
                            const { controlId, name, optionKey } = form;
                            const { key, value } = optionKey ?? { key: "", value: "" };

                            return (
                              query[name] && (
                                <Badge
                                  key={index}
                                  role="button"
                                  bg="secondary"
                                  pill={false}
                                  className="btn mt-3"
                                  onClick={() => {
                                    setQuery({ ...query, [name]: "" });
                                    submit({ ...query, [name]: "" }, { replace: true });
                                  }}
                                >
                                  <i className="bi bi-x me-1" />
                                  {key && value ? searchies[controlId].find((item: Record<string, string>) => item[key] == query[name])?.[value] : query[name]}
                                </Badge>
                              )
                            );
                          })}
                        </Stack>
                        {/* TODO */}
                        {false && (
                          <Col md={12} lg={2}>
                            <ButtonGroup aria-label="Basic example">
                              {buttons.map((button) => (
                                <ToggleButton
                                  key={button.id}
                                  id={button.id}
                                  type={button.type}
                                  name={button.name}
                                  variant={button.variant}
                                  checked={query.limit === button.value}
                                  value={button.value}
                                  // onChange={(e) => setQuery({ ...query, limit: e.currentTarget.value })}
                                >
                                  {button.label}
                                </ToggleButton>
                              ))}
                            </ButtonGroup>
                          </Col>
                        )}
                      </>
                    )}
                  />
                }
              />
            </Row>
          </fieldset>
        </fieldset>
      </Form>
    </>
  );
}
