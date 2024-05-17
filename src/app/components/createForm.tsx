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
	const {
		controlId,
		label,
		as,
		ariaLabel,
		name,
		type,
		placeholder,
		autoComplete,
		required,
		disabled,
		readOnly,
		plaintext,
		min,
		max,
		patern,
		invalidMessage,
		optionKey,
		...rest
	} = form;

	return (
		<>
			{type === "checkbox" || type === "radio" ? (
				<>
					<Form.Check
						type={type}
						id={controlId}
						name={name}
						label={label}
						value="1"
						checked={value === "1"}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => (event ? event(e) : undefined)}
						{...rest}
					/>
				</>
			) : (
				<FloatingLabel controlId={controlId} label={label}>
					{as === "select" ? (
						<>
							<Form.Select
								aria-label={ariaLabel}
								name={name}
								defaultValue={data?.[controlId]}
								value={value}
								onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (event ? event(e) : undefined)}
								{...rest}
							>
								<option value="">{placeholder}</option>
								{option?.map((item, index) => (
									<option key={index} value={optionKey ? item[optionKey.key] : undefined}>
										{optionKey ? item[optionKey.value] : undefined}
									</option>
								))}
							</Form.Select>
						</>
					) : (
						<>
							<Form.Control
								type={type}
								name={name}
								placeholder={placeholder}
								autoComplete={autoComplete}
								required={required}
								disabled={disabled}
								readOnly={readOnly}
								plaintext={plaintext}
								value={value}
								defaultValue={data?.[controlId]}
								onChange={(e: React.ChangeEvent<HTMLInputElement>) => (event ? event(e) : undefined)}
								min={min}
								max={max}
								pattern={patern}
								{...rest}
							/>
							<Form.Control.Feedback type="invalid">{invalidMessage}</Form.Control.Feedback>
						</>
					)}
				</FloatingLabel>
			)}
		</>
	);
}
