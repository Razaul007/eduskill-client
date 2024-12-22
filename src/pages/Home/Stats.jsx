import React from 'react';

const Stats = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="stats-item text-center">
                    <h3 className="text-2xl font-bold">Total Tutors</h3>
                    <p className="text-3xl">500+</p>
                </div>
                <div className="stats-item text-center">
                    <h3 className="text-2xl font-bold">Total Reviews</h3>
                    <p className="text-3xl">1000+</p>
                </div>
                <div className="stats-item text-center">
                    <h3 className="text-2xl font-bold">Languages Offered</h3>
                    <p className="text-3xl">50+</p>
                </div>
                <div className="stats-item text-center">
                    <h3 className="text-2xl font-bold">Total Users</h3>
                    <p className="text-3xl">2000+</p>
                </div>
            </div>
        </section>
    );
};

export default Stats;