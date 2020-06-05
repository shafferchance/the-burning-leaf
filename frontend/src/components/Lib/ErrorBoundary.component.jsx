import React from 'react';
import { Card, CardBody, CardHeader } from 'reactstrap';

// Functional components do not yet support error boundaries
export class ErrorBoundary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }
  
    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.log(error);
        console.log(errorInfo);
    }

    render() {
        if (this.props.isLoading) {
            return (
                <div className={"loading-container"}>
                    <div className={"loading"}/> 
                </div>
            );
        } else if (this.state.hasError) {
            return (
                <Card>
                    <CardHeader>Error</CardHeader>
                    <CardBody>
                        Something went wrong.
                    </CardBody>
                </Card>
            );
        } else {
            return this.props.children; 
        }
    }
  }