import { useActionState } from "react";
import supabase from "../supabase-client.js";
import { useAuth } from "../context/AuthContext.jsx";

function Form() {
  const { users, session } = useAuth();

  const currentUser = users?.find((user) => user.id === session?.user?.id);

  const [state, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const userId = formData.get("userId");

      if (!userId) {
        return {
          success: false,
          error: "Please select a sales representative.",
        };
      }

      const dealValue = parseInt(formData.get("value"), 10);

      if (isNaN(dealValue) || dealValue <= 0) {
        return {
          success: false,
          error: "Please enter a valid deal amount.",
        };
      }

      const newDeal = {
        user_id: userId,
        value: dealValue,
      };

      try {
        const { error } = await supabase.from("sales_deals").insert(newDeal);

        if (error) {
          return {
            success: false,
            error: error.message,
          };
        }

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
    return users
      .filter((user) => user.account_type === "rep")
      .map((user) => (
        <option key={user.id} value={user.id}>
          {user.name}
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

        {currentUser?.account_type === "rep" ? (
          <label htmlFor="deal-name">
            Name:
            <input
              id="deal-name"
              type="text"
              value={currentUser?.name || ""}
              readOnly
              className="rep-name-input"
              aria-label="Sales representative name"
              aria-readonly="true"
            />
            <input type="hidden" name="userId" value={currentUser?.id || ""} />
          </label>
        ) : (
          <label htmlFor="deal-name">
            Name:
            <select
              id="deal-name"
              name="userId"
              defaultValue=""
              aria-required="true"
              aria-invalid={state.error ? "true" : "false"}
              disabled={isPending}
            >
              <option value="" disabled>
                Select a representative
              </option>
              {generateOptions()}
            </select>
          </label>
        )}

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

      {state.error && (
        <div role="alert" className="error-message">
          Failed to add deal: {state.error}
        </div>
      )}

      {state.success && (
        <div className="success-message">Deal added successfully!</div>
      )}
    </div>
  );
}

export default Form;
