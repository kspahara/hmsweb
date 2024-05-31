import { Button, FloatingLabel, Form, InputGroup } from "react-bootstrap";
import { useHinInputSuryo } from "../../hooks/hooks.ts";
import { Fallback } from "../fallback.tsx";

/**
 *
 * @param param0
 * @returns
 */
export const HinInputSuryo = ({ data }: { data: Record<string, string> }): JSX.Element => {
  const { isFeaching, FeacherForm } = useHinInputSuryo();

  return (
    <div className="d-grid">
      <Form as={FeacherForm} method="post" name="form_favorite">
        <fieldset disabled={isFeaching}>
          <Button
            type="submit"
            name="hin_attr_cd"
            value={data.hin_attr_cd === "1" ? "0" : "1"}
            variant={data.hin_attr_cd === "1" ? "warning" : "light"}
            aria-label={data.hin_attr_cd === "1" ? "お気に入りを外す" : "お気に入りに追加"}
            className="btn btn-sm lh-sm mb-2 w-100"
          >
            {isFeaching ? (
              <Fallback variant={data.hin_attr_cd === "1" ? "dark" : "secondary"} />
            ) : (
              <>
                <i className="bi bi-star-fill me-1" />
                {data.hin_attr_cd === "1" ? "お気に入りを外す" : "お気に入りに追加"}
              </>
            )}
          </Button>
          <Form.Control type="hidden" name="form_type" value="favorite" />
          <Form.Control type="hidden" name="hin_cd" value={data.hin_cd} />
        </fieldset>
      </Form>
      <Form as={FeacherForm} method="post" name="form_cart">
        <fieldset disabled={isFeaching}>
          <InputGroup>
            <FloatingLabel controlId="suryo" label="数量">
              <Form.Control type="number" name="suryo" min="1" placeholder="数量を入力してください" defaultValue={1} className="text-end" />
            </FloatingLabel>
            <Button type="submit" name="hin_cd" value={data.hin_cd} variant="primary" className="lh-sm">
              {isFeaching ? (
                <Fallback variant="light" />
              ) : (
                <>
                  <div>
                    <small className="">カートに入れる</small>
                  </div>
                  <i className="bi bi-cart-plus-fill" />
                </>
              )}
            </Button>
          </InputGroup>
          <Form.Control type="hidden" name="form_type" value="cart" />
        </fieldset>
      </Form>
    </div>
  );
};
