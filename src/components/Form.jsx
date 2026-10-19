import { useActionState } from "react";
import supabase from "../supabase-client.js";

function Form({ metrics }) {
  const [state, submitAction, isPending] = useActionState(
    async (_, formData) => {
      try {
        const { error } = await supabase.from("sales_deals").insert({
          name: formData.get("name"),
          value: parseInt(formData.get("value"), 10),
        });

        if (error) throw error;

        return {
          success: true,
          error: null,
        };
      } catch (err) {
        return {
          success: false,
          error: err.message,
        };
      }
    },
    {
      success: false,
      error: null,
    },
  );

  const generateOptions = () => {
    return metrics?.map((metric) => (
      <option key={metric.name} value={metric.name}>
        {metric.name}
      </option>
    ));
  };

  return (
    <div className="add-form-container">
      <form
        action={submitAction}
        aria-label="Add new sales deal"
        aria-describedby="form-description"
      >
        <div id="form-description" className="sr-only">
          Use this form to add a new sales deal. Select a sales rep and enter
          the amount.
        </div>

        <label htmlFor="deal-name">
          Name:
          <select
            id="deal-name"
            name="name"
            defaultValue={metrics?.[0]?.name || ""}
            aria-required="true"
            aria-invalid={state.error ? "true" : "false"}
            disabled={isPending}
          >
            {generateOptions()}
          </select>
        </label>

        <label htmlFor="deal-value">
          Amount: $
          <input
            id="deal-value"
            type="number"
            name="value"
            defaultValue={0}
            className="amount-input"
            min="0"
            step="10"
            aria-required="true"
            aria-invalid={state.error ? "true" : "false"}
            aria-label="Deal amount in dollars"
            disabled={isPending}
          />
        </label>

        <button type="submit" disabled={isPending} aria-busy={isPending}>
          {isPending ? "Adding..." : "Add Deal"}
        </button>
      </form>

      {state.error && <p>{state.error}</p>}
      {state.success && <p>Deal added successfully!</p>}
    </div>
  );
}

export default Form;
