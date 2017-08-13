import * as React from 'react';

interface IProps {
    className?: string;
}

export class Page extends React.Component<IProps> {
    render() {
        const { className = '' } = this.props;
        return (
            <div className={`page ${className}`}>

            </div>
        );
    }
}
