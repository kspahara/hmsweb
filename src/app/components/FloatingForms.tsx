import { FloatingLabel, Form } from "react-bootstrap";

/**
 * Form
 */
export type Form = {
	type?: string;
	controlId: string;
	label: string;
	placeholder: string;
	autoComplete?: string;
	disabled?: boolean;
	required?: boolean;
	readOnly?: boolean;
	plaintext?: boolean;
	defaultValue?: string;
	as?: React.ElementType;
	style?: React.CSSProperties;
	ariaLabel?: string;
	optionKey?: { key: string; value: string };
};

interface FormProps {
	forms: Form[];
	data?: Record<string, string>;
	option?: Record<string, string>[];
	value?: string;
	event?: (value: string) => void;
}
/**
 * Forms
 * textareaとselectはasで指定
 * @param param0
 * @returns
 */
export function FloatingForms({ forms, data, option, value, event }: FormProps): JSX.Element {
	return (
		<>
			{forms.map((form, index) => (
				<FloatingLabel key={index} controlId={form.controlId} label={form.label} className="mb-3">
					{form.as === "select" ? (
						<Form.Select
							aria-label={form.ariaLabel}
							name={form.controlId}
							defaultValue={data?.[form.controlId]}
							value={value}
							onChange={(e) => (event ? e.currentTarget.value : undefined)}
						>
							<option value={""}>{form.placeholder}</option>
							{option?.map((item, index) => (
								<option key={index} value={form.optionKey ? item[form.optionKey.key] : undefined}>
									{form.optionKey ? item[form.optionKey.value] : undefined}
								</option>
							))}
						</Form.Select>
					) : (
						<Form.Control
							type={form.type}
							name={form.controlId}
							placeholder={form.placeholder}
							autoComplete={form.autoComplete}
							required={form.required}
							disabled={form.disabled}
							readOnly={form.readOnly}
							plaintext={form.plaintext}
							defaultValue={data?.[form.controlId]}
						/>
					)}
				</FloatingLabel>
			))}
		</>
	);
}
