import * as React from 'react';
import { Footer } from '../footer';
import { Header } from '../header';
import './style.scss';

interface IProps {
    name?: string;
}

export class Page extends React.Component<IProps> {
    render() {
        const { name = '', children } = this.props;
        return (
            <div className="container-fluid">
                <Header></Header>
                <div className={`_page ${name}-page`}>
                    {children}
                </div>
                <Footer></Footer>
            </div>
        );
    }
}
