const state = {
    user: null, // { name: 'Alice', phone: '1234567890', email: 'alice@example.com' }
    wallet: 1500,
    points: 120,
    trips: [
        { id: 1, start: 'Indiranagar', dest: 'Koramangala', date: '2026-02-20', role: 'rider', rating: 5, price: 150 },
        { id: 2, start: 'HSR Layout', dest: 'Whitefield', date: '2026-02-25', role: 'driver', rating: 4, price: 300 }
    ],
    availableRides: [
        { id: 101, name: 'Rahul S.', rating: 4.8, start: 'Indiranagar', dest: 'Koramangala', time: '09:00 AM', seats: 2, price: 100 },
        { id: 102, name: 'Priya K.', rating: 4.9, start: 'Marathahalli', dest: 'Whitefield', time: '09:30 AM', seats: 1, price: 120 }
    ],
    locations: [
        'Indiranagar', 'Koramangala', 'HSR Layout', 'Whitefield', 'Marathahalli', 'BTM Layout', 'Jayanagar', 'JP Nagar', 'Electronic City', 'Bellandur'
    ],
    listeners: [],

    load() {
        const saved = localStorage.getItem('routeMateState');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                Object.assign(this, parsed);
            } catch (e) { console.error('Error loading state'); }
        }
    },

    save() {
        const toSave = { user: this.user, wallet: this.wallet, points: this.points, trips: this.trips, availableRides: this.availableRides };
        localStorage.setItem('routeMateState', JSON.stringify(toSave));
        this.notify();
    },

    login(userObj) {
        this.user = userObj;
        this.save();
    },

    logout() {
        this.user = null;
        this.save();
    },

    addPayment(amount) {
        this.wallet += amount;
        this.points += 1; // 1 payment = 1 point
        this.save();
    },

    redeemPoints() {
        if (this.points >= 5) {
            const credits = Math.floor(this.points / 5);
            this.points = this.points % 5;
            this.wallet += credits; // ₹1 for every 5 points
            this.save();
            return credits;
        }
        return 0;
    },

    publishRide(ride) {
        this.availableRides.push({
            ...ride,
            id: Date.now(),
            name: this.user ? this.user.name : 'You',
            rating: 5.0
        });
        this.save();
    },

    bookRide(rideId) {
        const ride = this.availableRides.find(r => r.id === rideId);
        if (!ride) return;

        if (this.wallet >= ride.price) {
            this.wallet -= ride.price;
            this.trips.push({
                id: Date.now(),
                start: ride.start,
                dest: ride.dest,
                date: new Date().toISOString().split('T')[0],
                role: 'rider',
                rating: null,
                price: ride.price
            });
            // Removing booked seat
            if (ride.seats > 1) {
                ride.seats -= 1;
            } else {
                this.availableRides = this.availableRides.filter(r => r.id !== rideId);
            }
            this.save();
            return true;
        }
        return false;
    },

    subscribe(fn) {
        this.listeners.push(fn);
    },

    notify() {
        this.listeners.forEach(fn => fn());
    }
};
window.state = state;
