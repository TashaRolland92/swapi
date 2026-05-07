import styles from './TransportItem.module.scss';
import {
    type TransportItemData,
} from '../app/utils/swapi';

type TransportProps = {
    item: TransportItemData;
};

const TransportItem = ({ item }: TransportProps) => (
    <ul className={styles.transport_item}>
        <li><span className={styles.bold}>Name:</span> {item.name}</li>
        <li><span className={styles.bold}>Model:</span> {item.model}</li>
        <li><span className={styles.bold}>Manufacturer:</span> {item.manufacturer}</li>
        <li><span className={styles.bold}>Cost:</span> {item.cost_in_credits}</li>
        <li><span className={styles.bold}>Length:</span> {item.length}</li>
        <li><span className={styles.bold}>Crew:</span> {item.crew}</li>
        <li><span className={styles.bold}>Passengers:</span> {item.passengers}</li>
        <li><span className={styles.bold}>Cargo capacity:</span> {item.cargo_capacity}</li>
    </ul>
);

export default TransportItem;
