# Dynamic Form Builder
- The **dynamic form builder** application allows a user to build/configure forms, allows the forms to be stored and _retain_ on demand.
- These forms are stored in the form of **JSON**.
- Special component called **Configurator** is responsible for building the form and exports the form in form of JSON.
- A complementary component called **Presenter** reads the JSON extracted by _Configurator_ .

## Configurator
- This is the most crucial component of the app that allows user to configure form on a grid/cellular layout.
- User initially can define the grid layout before the user can start placing form controls and building the form holistically.
- It has three main sub-components that work together to complete the configurator i.e **Controls, Canvas and the Properties window**.
  
### 1. Form Controls
- This will a **controlled** component that hosts a variety of special controls that user can pick from.
- These controls are nothing but a special wrapper over native _form elements_.
- User can drag and drop these controls over from the Controls area to the _Form Canvas_.

### 2. Form Canvas
- This is the area where form controls are dropped and laid out.
- These form controls are placed within a _grid layout_.
- Forms are build by placing the elements within the boundary of the **cellular/grid** layout.
- User can add/remove elements to a specific **cell** in the layout.
- User can select a control to modify it's properties.

### 3. Properties
- The properties component will be rendered in the form of a **collapsible window or drawer**.
- This component will house all the properties of an element placed within the form canvas.
- User may modify any or all of the eligible properties of a control.
- This modification of properties is reflected instantaneously.
