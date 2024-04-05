import { FloatingLabel, Form } from "react-bootstrap";

/**
 * FormType
 * invalidMessage: バリデーションエラーメッセージ
 */
export type FormType = {
	type?: string;
	controlId: string;
	name: string;
	label: string;
	placeholder: string;
	autoComplete?: string;
	disabled?: boolean;
	required?: boolean;
	invalidMessage?: string;
	readOnly?: boolean;
	plaintext?: boolean;
	defaultValue?: string;
	min?: number;
	max?: number;
	patern?: string;
	minLength?: number;
	maxLength?: number;
	as?: React.ElementType;
	style?: React.CSSProperties;
	ariaLabel?: string;
	optionKey?: { key: string; value: string };
};

/**
 * FormProps
 */
type FormProps = {
	form: FormType;
	data?: Record<string, string>;
	option?: Record<string, string>[];
	value?: string;
	event?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
};
/**
 * Forms
 * textareaとselectはasで指定
 * @param param0
 * @returns
 */
export function CreateForm({ form, data, option, value, event }: FormProps): JSX.Element {
	return (
		<>
			<FloatingLabel controlId={form.controlId} label={form.label}>
				{form.as === "select" ? (
					<Form.Select
						aria-label={form.ariaLabel}
						name={form.name}
						defaultValue={data?.[form.controlId]}
						value={value}
						onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (event ? event(e) : undefined)}
					>
						<option value={""}>{form.placeholder}</option>
						{option?.map((item, index) => (
							<option key={index} value={form.optionKey ? item[form.optionKey.key] : undefined}>
								{form.optionKey ? item[form.optionKey.value] : undefined}
							</option>
						))}
					</Form.Select>
				) : (
					<>
						<Form.Control
							type={form.type}
							name={form.name}
							placeholder={form.placeholder}
							autoComplete={form.autoComplete}
							required={form.required}
							disabled={form.disabled}
							readOnly={form.readOnly}
							plaintext={form.plaintext}
							value={value}
							defaultValue={data?.[form.controlId]}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => (event ? event(e) : undefined)}
							min={form.min}
							max={form.max}
							pattern={form.patern}
						/>
						<Form.Control.Feedback type={"invalid"}>{form.invalidMessage}</Form.Control.Feedback>
					</>
				)}
			</FloatingLabel>
		</>
	);
}
