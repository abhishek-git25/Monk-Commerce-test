
import "./assets/css/bootstrap.css"
import "./assets/css/custom.css"
import Router from "./routes/router";


function App() {
  return (
    <div>
      {/* <Button
        color="primary"
        className="button-md"
      >
        Click Me
      </Button>
      <Button
        color="primary"
        outline
        size="lg"
        className="button-lg"
      >
        Click Me
      </Button>

      <Form>
        <FormGroup
          check
          inline
        >
          <Input type="checkbox" />
          <Label check>
            Some input
          </Label>
        </FormGroup>
        <FormGroup
          check
          inline
        >
          <Input type="checkbox" />
          <Label check>
            Some other input
          </Label>
        </FormGroup>
      </Form> */}
      <Router/>
    </div>
  );
}

export default App;
