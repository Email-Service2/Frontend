import { createSlice } from "@reduxjs/toolkit";
import { sendEmail, emails, viewedMail } from "../thunks/emailThunk";

const emailSlice = createSlice({
  name: "email",
  initialState: {
    loading: false,
    email: [],
    send: null,
    selectedEmail: null,
    updatedEmail: null,
    activeFolder:"",
    emailLoading:false
  },
  reducers: {
    toggleImportantLocal: (state, action) => {
      const email = state.email.emails.find((e) => e._id === action.payload);
      if (email) {
        email.isImportant = !email.isImportant;
      }
    },

    toggleRead: (state, action) => {
      const email = state.email.emails.find((e) => e._id === action.payload);
      if (email) {
        email.isRead = !email.isRead;
      }
    },
    

  },
  extraReducers: (builder) => {
    builder
      .addCase(sendEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.send = action.payload;
        state.success = true;
      })
      .addCase(sendEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      })

      //

      .addCase(emails.pending, (state) => {
        state.emailLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(emails.fulfilled, (state, action) => {
        state.emailLoading = false;
        state.email = action.payload;
        state.success = true;
      })
      .addCase(emails.rejected, (state, action) => {
        state.emailLoading = false;
        state.error = action.payload;
        state.success = false;
      })

      //

      .addCase(viewedMail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(viewedMail.fulfilled, (state, action) => {
        state.loading = false;
        state.updatedEmail = action.payload;
        state.success = true;
      })
      .addCase(viewedMail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { selectedEmail, toggleImportantLocal, toggleRead } = emailSlice.actions;

export default emailSlice.reducer;
